<?php

use App\Models\CitizenFee;
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
        Schema::create('citizen_fee_details', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(CitizenFee::class)->constrained();
            $table->foreignIdFor(User::class)->constrained();
            $table->date('date');
            $table->integer('amount')->unsigned()->default(0);
            $table->timestamps();

            // created/updated/deleted info
            $table->integer('created_by_id')->unsigned()->nullable();
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
        Schema::dropIfExists('citizen_fee_details');
    }
};
