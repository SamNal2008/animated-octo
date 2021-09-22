var bulletTime1 = 0;

var bullet_player1_material = new THREE.MeshLambertMaterial(
{
    color: 0x00ff00, 
    transparent: false
});

function shoot()
{
    if (keyboard.pressed("space") && bulletTime1 + 0.8 < clock.getElapsedTime())
    {
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            bullet_player1_material);
        scene.add(bullet);
        bullet.position.x = player1.graphic.position.x + 7.5 * Math.cos(player1.direction);
        bullet.position.y = player1.graphic.position.y + 7.5 * Math.sin(player1.direction);
        bullet.angle = player1.direction;
        player1.bullets.push(bullet);
        bulletTime1 = clock.getElapsedTime();
    } 

    // move bullets
    var moveDistance = 5;

    for (var i = 0; i < player1.bullets.length; i++)
    {
        player1.bullets[i].position.x += moveDistance * Math.cos(player1.bullets[i].angle);
        player1.bullets[i].position.y += moveDistance * Math.sin(player1.bullets[i].angle);
    }

}

function collisions()
{
    bullet_collision();
    player_collision();
    player_falling();
}

function bullet_collision()
{
    //collision between bullet and walls
    for (var i = 0; i < player1.bullets.length; i++)
    {
        if (Math.abs(player1.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player1.bullets[i].position.y) >= HEIGHT / 2)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
        }
    }

}

function player_collision()
{
    //collision between player and walls
    var x = player1.graphic.position.x;
    var y = player1.graphic.position.y;



    if ( x > (WIDTH / 2)) {
        console.log('to right')
        player1.graphic.position.x -= x - WIDTH/2;
        player1.position.x = player1.graphic.position.x
    }
    if ( y < (-HEIGHT / 2) ) {
        console.log('too low')
        player1.graphic.position.y -= player1.graphic.position.y + HEIGHT/2;
        player1.position.y = player1.graphic.position.y
    }
    if ( y > (HEIGHT/2) ) {
        console.log('too height')
        player1.graphic.position.y -= y - HEIGHT/2;
        player1.position.y = player1.graphic.position.y
    }
    if (x < (-WIDTH/2)) {
        console.log('too left')
        player1.graphic.position.x -= x + WIDTH/2
        player1.position.x = player1.graphic.position.x
    }

}


function player_falling()
{
    var nb_tile = 10;
    var sizeOfTileX = WIDTH / nb_tile;
    var sizeOfTileY = HEIGHT / nb_tile;
    var x = player1.graphic.position.x;
    var y = player1.graphic.position.y;
    var element = null;
    for (var i = 0; i < noGround.length; i++) {
        element = noGround[i];
        if (y > element.bot && y < element.top && x > element.left && x < element.right ) {
            player1.dead();
        }
    }

}
