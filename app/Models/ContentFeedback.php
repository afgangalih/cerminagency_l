<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContentFeedback extends Model
{
    use HasFactory;

    protected $table = 'content_feedbacks';

    protected $fillable = [
        'content_id',
        'sender_name',
        'sender_role',
        'feedback_text',
    ];

    public function content(): BelongsTo
    {
        return $this->belongsTo(Content::class);
    }
}

