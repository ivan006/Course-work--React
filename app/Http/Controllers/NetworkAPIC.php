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
    // $routeParameters = func_get_args();
    // $DataShowMultiForEdit = Data::ShowMultiForEdit($routeParameters);
    // return $DataShowMultiForEdit;

    // $thing = array (
    //   array(
    //     "id" => 1,
    //     "name" => "blabla",
    //     "body" => "blabla",
    //     "created" => "blabla",
    //     "updated" => "blabla"
    //   ),
    //   array(
    //     "id" => 2,
    //     "name" => "blabla",
    //     "body" => "blabla",
    //     "created" => "blabla",
    //     "updated" => "blabla"
    //   ),
    // );
    // return json_encode($thing);

    // $thing = array (
    //   0 =>
    //   array (
    //     'name' => 'Pepperoni',
    //     'id' => 'pepperoni-id',
    //     'subOptions' =>
    //     array (
    //       0 =>
    //       array (
    //         'name' => 'Spicy',
    //         'id' => 'spicy-id',
    //         'subOptions' =>
    //         array (
    //         ),
    //       ),
    //       1 =>
    //       array (
    //         'name' => 'Regular',
    //         'id' => 'regular-id',
    //         'subOptions' =>
    //         array (
    //         ),
    //       ),
    //     ),
    //   ),
    //   1 =>
    //   array (
    //     'name' => 'Chicken',
    //     'id' => 'chicken-id',
    //     'subOptions' =>
    //     array (
    //       0 =>
    //       array (
    //         'name' => 'Buffalo',
    //         'id' => 'buffalo-id',
    //         'subOptions' =>
    //         array (
    //           0 =>
    //           array (
    //             'name' => 'Mild',
    //             'id' => 'mild-id',
    //             'subOptions' =>
    //             array (
    //             ),
    //           ),
    //           1 =>
    //           array (
    //             'name' => 'Hot',
    //             'id' => 'hot-id',
    //             'subOptions' =>
    //             array (
    //               0 =>
    //               array (
    //                 'name' => 'Jalapeño',
    //                 'id' => 'jalapeno-id',
    //                 'subOptions' =>
    //                 array (
    //                 ),
    //               ),
    //               1 =>
    //               array (
    //                 'name' => 'Cayenne',
    //                 'id' => 'cayenne-id',
    //                 'subOptions' =>
    //                 array (
    //                 ),
    //               ),
    //             ),
    //           ),
    //         ),
    //       ),
    //       1 =>
    //       array (
    //         'name' => 'BBQ',
    //         'id' => 'bbq-id',
    //         'subOptions' =>
    //         array (
    //         ),
    //       ),
    //     ),
    //   ),
    // );
    //
    // return json_encode($thing);

    $thing = array (
      0 =>
      array (
        'name' => 'Pepperoni',
        'id' => 'pepperoni-id',
        'content' =>
        array (
          0 =>
          array (
            'name' => 'Spicy',
            'id' => 'spicy-id',
            'content' =>
            array (
            ),
          ),
          1 =>
          array (
            'name' => 'Regular',
            'id' => 'regular-id',
            'content' =>
            array (
            ),
          ),
        ),
      ),
      1 =>
      array (
        'name' => 'Chicken',
        'id' => 'chicken-id',
        'content' =>
        array (
          0 =>
          array (
            'name' => 'Buffalo',
            'id' => 'buffalo-id',
            'content' =>
            array (
              0 =>
              array (
                'name' => 'Mild',
                'id' => 'mild-id',
                'content' =>
                array (
                ),
              ),
              1 =>
              array (
                'name' => 'Hot',
                'id' => 'hot-id',
                'content' =>
                array (
                  0 =>
                  array (
                    'name' => 'Jalapeño',
                    'id' => 'jalapeno-id',
                    'content' =>
                    array (
                    ),
                  ),
                  1 =>
                  array (
                    'name' => 'Cayenne',
                    'id' => 'cayenne-id',
                    'content' =>
                    array (
                    ),
                  ),
                ),
              ),
            ),
          ),
          1 =>
          array (
            'name' => 'BBQ',
            'id' => 'bbq-id',
            'content' =>
            array (
            ),
          ),
        ),
      ),
    );

    return json_encode($thing);



  }


}
