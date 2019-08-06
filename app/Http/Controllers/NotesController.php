<?php

namespace App\Http\Controllers;

use App\Note;
use Illuminate\Http\Request;

class NotesController extends Controller
{
    public function index(){
        return Note::all();
    }

    public function show($id){
        return Note::findorfail($id);
    }

    public function store(Request $request){

        $validatedData = $request->validate([
            'note' => 'required|min:5|max:255',
        ]);

        $note = Note::create([
            'note' => $validatedData['note'],
        ]);

        return response()->json('Note created!');

    }

    public function update(Request $request, $id){

        $validatedData = $request->validate([
            'note' => 'required|min:5|max:255',
        ]);

        $note = Note::find($id);
        $note->note = $validatedData['note'];

        $note->save();

        return response()->json('Note Updated!');

    }

    public function destroy($id){

        $note = Note::findorfail($id);

        $note->delete();

        return response()->json('Note Deleted!');

    }
}
