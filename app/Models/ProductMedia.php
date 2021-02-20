<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductMedia extends Model
{
    use HasFactory;

    protected $table = 'product_medias';
    protected $fillable = [
        'product_id', 'media_url', 'media_type'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
