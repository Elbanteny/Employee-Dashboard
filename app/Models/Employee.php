<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{

    use HasFactory;
    protected $fillable = [
        'nip', 'name', 'email', 'phone', 'position_id',   
    'department_id', 'photo', 'joined_date'
    ];

    public function department() {
    return $this->belongsTo(Department::class);
}

public function position() {
    return $this->belongsTo(Position::class);
}
}
