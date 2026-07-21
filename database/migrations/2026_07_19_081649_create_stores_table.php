<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category'); // food, grocery, medicine
            $table->text('description')->nullable();
            $table->string('address');
            $table->string('city')->default('Jhapa');
            $table->decimal('lat', 10, 7)->nullable();
            $table->decimal('lng', 10, 7)->nullable();
            $table->string('phone')->nullable();
            $table->string('logo')->nullable();
            $table->string('cover_image')->nullable();
            $table->json('opening_hours')->nullable(); // e.g. {"mon": "9am-9pm", ...}
            $table->boolean('is_open')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->decimal('delivery_fee', 8, 2)->default(0);
            $table->integer('estimated_delivery_minutes')->default(30);
            $table->foreignId('created_by')->constrained('users'); // admin user id
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
