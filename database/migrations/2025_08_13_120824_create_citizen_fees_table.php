<?php

use App\Enums\CitizenFeeStatus;
use App\Models\CitizenFeeCategory;
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
        Schema::create('citizen_fees', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(CitizenFeeCategory::class)->constrained();
            $table->string('name');
            $table->date('effective_date');
            $table->date('due_date')->nullable();
            // $table->string('status', 20)->default(CitizenFeeStatus::IN_PROGRESS->value);
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
        Schema::dropIfExists('citizen_fees');
    }
};
