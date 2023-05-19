<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

$app = AppFactory::create();
$app->addRoutingMiddleware();
$errorMiddleware = $app->addErrorMiddleware(false, false, false);


// GET REQUEST (ALL DATA)
$app->get('/students', function (Request $request, Response $response, array $args) {
        $db = new Database;
        $data = $db->selectQuery();
        $response->getBody()->write($data);
        return $response->withHeader('Content-Type', 'application/json');
    
});

// GET REQUEST (ONE DATA)
$app->get('/students/{id}', function (Request $request, Response $response, array $args) {
    $id = $args['id'];   
    $db = new Database;
    $data = $db->selectQuery($id);
    $response->getBody()->write($data);
    return $response->withHeader('Content-Type', 'application/json');
});

// POST REQUEST (ADD DATA)
$app->post('/students/add', function (Request $request, Response $response, array $args) {
    if($request->getMethod() == 'POST'){
        $data = $request->getBody();
        $db = new Database;
        $result = $db->insertQuery($data);
        $response->getBody()->write($result);
        return $response->withHeader('Content-Type', 'application/json');
    }
});

// PUT REQUEST (UPDATE DATA)
$app->put('/students/edit/{id}', function (Request $request, Response $response, array $args) {
    if($request->getMethod() == 'PUT'){
        $id = $args['id'];   
        $data = $request->getBody();
        $db = new Database;
        $result = $db->updateQuery($data, $id);
        $response->getBody()->write($result);
        return $response->withHeader('Content-Type', 'application/json');
    }
});

// DELETE REQUEST (UPDATE DATA)
$app->delete('/students/delete/{id}', function (Request $request, Response $response, array $args) {
    if($request->getMethod() == 'DELETE'){
        $id = $args['id'];   
        $db = new Database;
        $result = $db->deleteQuery($id);
        $response->getBody()->write($result);
        return $response->withHeader('Content-Type', 'application/json');
    }
});