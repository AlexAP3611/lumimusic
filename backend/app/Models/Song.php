<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Song extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'artist',
        'difficulty',
        'url'
    ];

    public function tablatures(): HasMany
    {
        return $this->hasMany(Tablature::class);
    }
}
