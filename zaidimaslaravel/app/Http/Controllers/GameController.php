<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GameController extends Controller
{

    public function index()
    {
        $lastgame = Game::select('games.*')->first();
        if ($lastgame->finished = '1') {
            $game = new Game();
            $game->finished = '0';
            $game->save();
            return response($game->jsonSerialize(), Response::HTTP_CREATED);
        }

        return response()->json($lastgame);
    }

    public function restart()
    {
        $game = new Game();
        $game->finished = '0';
        $game->save();
        return response()->json($game);
    }

    public function action(Request $request)
    {
        $action = Action::create($request->all());
        $action->save();

        return response()->json($action);
    }

    public function finish(Request $request)
    {
        $data = $request->all();
        $lastgame = Game::where('id', '=', $data['game'])->first();
        $lastgame->finished = '1';
        $lastgame->winner = $data['winner'];
        $lastgame->save();

        return response()->json($lastgame);
    }

    public function read()
    {
        $lastgame = Game::latest()->first();
        if ($lastgame->finished == 1) {
            return response()->json($lastgame);
        }
        $lastaction = Action::latest()->first();

        return response()->json($lastaction);
    }
}
