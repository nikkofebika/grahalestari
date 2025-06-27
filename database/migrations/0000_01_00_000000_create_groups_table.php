<?php

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
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->integer('parent_id')->unsigned()->nullable()->index();
            $table->integer('leader_id')->unsigned()->nullable()->index();
            $table->tinyInteger('province_id')->unsigned()->nullable();
            $table->string('province_name', 50)->nullable();
            $table->smallInteger('city_id')->unsigned()->nullable();
            $table->string('city_name', 50)->nullable();
            $table->mediumInteger('district_id')->unsigned()->nullable();
            $table->string('district_name', 50)->nullable();
            $table->integer('village_id')->unsigned()->nullable();
            $table->string('village_name', 50)->nullable();
            $table->string('name', 50);
            $table->text('address')->nullable();
            $table->string('latitude', 20)->nullable();
            $table->string('longitude', 20)->nullable();
            $table->string('postal_code', 10)->nullable();
            $table->timestamps();

            // created/updated/deleted info
            $table->integer('created_by_id')->unsigned()->nullable();
            $table->integer('updated_by_id')->unsigned()->nullable();
            $table->integer('deleted_by_id')->unsigned()->nullable();
            $table->softDeletes();

            // $table->foreign('parent_id')->references('id')->on('groups')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups');
    }
};
