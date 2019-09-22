<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Group;
use App\Report;
use App\Data;
use App\Entity;

class NetworkAPIC extends Controller
{


  /**
  * Display the specified resource.
  *
  * @param int $id
  *
  * @return \Illuminate\Http\Response
  */
  public function show()
  {
    $routeParameters = func_get_args();
    $DataShowMultiForEdit = Data::ShowMultiForEdit($routeParameters);
    return $DataShowMultiForEdit;

  }


}
