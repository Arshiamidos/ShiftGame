#pragma strict
var speed=1;
function Start () {

}

function Update () {
	transform.position += Vector3(1, 0, 0) * speed * Time.deltaTime;
}