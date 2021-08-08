<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\Game;
use Faker\Generator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GameController extends Controller
{

    public function index()
    {
        $lastgame = Game::select('games.*')->first();
        if ($lastgame->finished == '1')
        {
            $game = new Game();
            $game->finished = '0';
            $game->save();
            return response($game->jsonSerialize(), Response::HTTP_CREATED);
        }

        return response()->json($lastgame);
    }

    public function action(Request $request)
    {
        $action = Action::create($request->all());
        $action->save();

        return response()->json($action);
    }
}
