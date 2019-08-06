<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/notes', 'NotesController@index');
Route::get('/notes/{id}', 'NotesController@show');
Route::post('/notes/{id}/edit', 'NotesController@update');
Route::post('/notes', 'NotesController@store');
Route::get('/notes/{id}/delete', 'NotesController@destroy');
