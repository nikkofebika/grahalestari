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
        Schema::create('user_details', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained();
            $table->string('no_kk', 20)->nullable();
            $table->string('no_ktp', 20)->nullable();
            $table->string('phone', 15)->nullable();
            $table->date('birth_date')->nullable();
            $table->string('birth_place')->nullable();
            $table->string('gender', 11)->nullable();
            $table->string('religion', 9)->nullable();
            $table->string('marital_status', 13)->nullable();
            $table->string('education', 3)->nullable();
            $table->string('job')->nullable();
            $table->text('address')->nullable();
            $table->timestamps();

            // created/updated/deleted info
            $table->integer('updated_by_id')->unsigned()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_details');
    }
};
