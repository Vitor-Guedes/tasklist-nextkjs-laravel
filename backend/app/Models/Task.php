<?php

namespace App\Models;

use Database\Factories\TaskFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    protected static function newFactory()
    {
        return TaskFactory::new();
    }

    public static function filterable()
    {
        return [
            'title',
            'status'
        ];
    }

    public function scopeTitle($query, $value)
    {
        $query->where('title', 'like', "%$value%");
    }

    public function scopeStatus($query, $value)
    {
        $query->where('status', '=', "$value");
    } 
}