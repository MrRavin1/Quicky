<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('rated_by')->constrained('users');
            $table->string('rated_entity_type'); // rider, store
            $table->unsignedBigInteger('rated_entity_id');
            $table->unsignedTinyInteger('rating'); // 1-5
            $table->text('comment')->nullable();
            $table->timestamps();

            $table->index(['rated_entity_type', 'rated_entity_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
