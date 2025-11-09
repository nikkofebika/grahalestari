<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('complaints', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained();
            $table->string('category', 25);
            $table->string('status', 15);
            $table->string('title', 100);
            $table->text('description');
            $table->string('location');
            $table->string('latitude', 20)->nullable();
            $table->string('longitude', 20)->nullable();
            $table->integer('handled_by_id')->nullable();
            $table->timestamp('handled_at')->nullable();
            $table->text('handled_feedback')->nullable();
            $table->integer('done_by_id')->nullable();
            $table->timestamp('done_at')->nullable();
            $table->text('done_feedback')->nullable();
            $table->text('feedback')->nullable();
            $table->timestamps();

            // created/updated/deleted info
            $table->integer('updated_by_id')->unsigned()->nullable();
            $table->integer('deleted_by_id')->unsigned()->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complaints');
    }
};
