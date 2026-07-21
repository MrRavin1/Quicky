<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Rider;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RiderController extends Controller
{
    public function index(Request $request)
    {
        $riders = Rider::with('user:id,name,email')
            ->when($request->search, fn($q) =>
                $q->whereHas('user', fn($u) =>
                    $u->where('name', 'like', "%{$request->search}%")
                      ->orWhere('email', 'like', "%{$request->search}%")
                )
            )
            ->when($request->status, function ($q) use ($request) {
                if ($request->status === 'pending') {
                    $q->where('verification_status', 'pending');
                } elseif ($request->status === 'active') {
                    $q->where('is_active', true);
                } elseif ($request->status === 'inactive') {
                    $q->where('is_active', false);
                }
            })
            ->latest()
            ->paginate(15)
            ->withQueryString()
            ->through(fn($r) => [
                'id'                  => $r->id,
                'name'                => $r->user?->name,
                'email'               => $r->user?->email,
                'phone'               => $r->phone,
                'vehicle_type'        => $r->vehicle_type,
                'source'              => $r->source,
                'verification_status' => $r->verification_status,
                'is_active'           => $r->is_active,
                'is_online'           => $r->is_online,
                'rejection_reason'    => $r->rejection_reason,
                'id_document_url'     => $r->id_document ? Storage::url($r->id_document) : null,
                'created_at'          => $r->created_at->format('d M Y'),
            ]);

        return Inertia::render('Admin/Riders/Index', [
            'riders'  => $riders,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /** Create an in-house rider directly (Admin-issued account) */
    public function create()
    {
        return Inertia::render('Admin/Riders/Form', ['rider' => null]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'         => 'required|string|max:255',
            'email'        => 'required|email|unique:users,email',
            'password'     => 'required|string|min:8',
            'phone'        => 'required|string|max:20',
            'vehicle_type' => 'required|in:motorcycle,bicycle,car',
            'license_no'   => 'nullable|string|max:50',
        ]);

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
            'role'     => 'rider',
            'phone'    => $data['phone'],
        ]);

        Rider::create([
            'user_id'             => $user->id,
            'phone'               => $data['phone'],
            'vehicle_type'        => $data['vehicle_type'],
            'license_no'          => $data['license_no'] ?? null,
            'source'              => 'in_house',
            'verification_status' => null,
            'is_active'           => true,
        ]);

        return redirect()->route('admin.riders.index')
            ->with('success', 'Rider account created.');
    }

    /** Approve a public applicant */
    public function approve(Rider $rider)
    {
        $rider->update([
            'verification_status' => 'approved',
            'is_active'           => true,
        ]);

        return back()->with('success', "Rider {$rider->user?->name} approved.");
    }

    /** Reject a public applicant */
    public function reject(Request $request, Rider $rider)
    {
        $request->validate([
            'rejection_reason' => 'required|string|max:500',
        ]);

        $rider->update([
            'verification_status' => 'rejected',
            'is_active'           => false,
            'rejection_reason'    => $request->rejection_reason,
        ]);

        return back()->with('success', 'Rider application rejected.');
    }

    public function toggleActive(Rider $rider)
    {
        $rider->update(['is_active' => ! $rider->is_active]);
        return back()->with('success', 'Rider status updated.');
    }
}
