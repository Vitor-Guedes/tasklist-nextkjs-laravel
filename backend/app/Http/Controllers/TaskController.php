<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $collection = Task::orderBy('created_at', 'asc')
            ->simplePaginate()
            ->setPath($request->path());

        return response()->json(
            $collection, 
            Response::HTTP_OK
        );
    }

    public function task(int $id)
    {
        return response()->json([
            'task' => Task::findOrFail($id)
        ], Response::HTTP_OK);
    }

    public function store()
    {
        try {
            $payload = request()->validate([
                'title' => 'required|string',
                'status' => 'required|string'
            ]);

            $newTask = Task::create($payload);

            return response()->json([
                'success' => true,
                'message' => 'Criado com sucesso.',
                'task' => $newTask
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(int $id)
    {
        try {
            $task = Task::findOrFail($id);
            $payload = request()->validate([
                'title' => 'required|string',
                'status' => 'required|string'
            ]);

            $task->update($payload);

            return response()->json([
                'success' => true,
                'message' => 'Atualizado com sucesso.',
                'task' => $task
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function delete(int $id)
    {
        try {
            Task::findOrFail($id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Deletado com sucesso.'
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function search(Request $request)
    {
        try {
            $parameters = $request->all();

            $query = Task::query();

            foreach ($parameters as $parameter => $value) {
                if (in_array($parameter, Task::filterable())) {
                    $query->{$parameter}($value);
                }
            }

            $collection = $query->orderBy('created_at', 'asc')
                ->simplePaginate()
                ->setPath($request->path());

            return response()->json(
                $collection, 
                Response::HTTP_OK
            );
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}