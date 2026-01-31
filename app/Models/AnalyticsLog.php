<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnalyticsLog extends Model
{
    protected $fillable = [
        'module',
        'metric',
        'value',
        'date',
    ];

    protected $casts = [
        'value' => 'decimal:2',
        'date' => 'date',
    ];
}
