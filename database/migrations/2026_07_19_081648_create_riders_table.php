<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('riders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('phone');
            $table->string('vehicle_type')->default('motorcycle'); // motorcycle, bicycle, car
            $table->string('license_no')->nullable();
            $table->string('id_document')->nullable(); // file path
            $table->string('source')->default('public_applicant'); // in_house, public_applicant
            // in_house riders have no verification_status (n/a), public applicants go through pending->approved/rejected
            $table->string('verification_status')->nullable(); // null for in_house, pending/approved/rejected for public
            $table->boolean('is_active')->default(false);
            $table->boolean('is_online')->default(false);
            $table->decimal('current_lat', 10, 7)->nullable();
            $table->decimal('current_lng', 10, 7)->nullable();
            $table->string('rejection_reason')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('riders');
    }
};
