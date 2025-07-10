<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Vyuldashev\LaravelOpenApi\Generator;

class OpenApiGenerator extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'openapi:save';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate openapi file json to storage/api-docs';

    /**
     * Execute the console command.
     */
    public function handle(Generator $generator)
    {
        $start = microtime(true);
        $filename = config('l5-swagger.documentations.default.paths.docs_json');
        $isCollectionExists = collect(config('openapi.collections'))->has('default');
        if (!$isCollectionExists) {
            $this->error('Collection not found');
            return;
        }

        Storage::disk('openapi')->put(
            $filename,
            $generator->generate()->toJson(JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );

        $timeInSeconds = microtime(true) - $start;
        $this->info(sprintf('%s generated at %s in %s seconds', $filename, config('filesystems.disks.openapi.root'), $timeInSeconds));
    }
}
