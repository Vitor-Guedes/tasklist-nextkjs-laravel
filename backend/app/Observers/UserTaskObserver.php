<?php

namespace App\Observers;

class UserTaskObserver
{
    public function creating($model)
    {
        $model->user_id = auth('api')->user()->id;

        return true;
    }
}
