#pragma strict
var chess:GameObject[];
var startTime:float;
var  minimum = 0.0f;
var  maximum = 1f;
var  duration = 5.0f;
var CHESS_PARTICLE:GameObject;
function Start () {
	 startTime = Time.time;
}

function Update () {

}
function OnTriggerEnter2D (col:Collider2D)
{
		if(col.gameObject.tag=="Player")
		{
			GetComponent.<SpriteRenderer>().enabled=false;
			GetComponent.<CircleCollider2D>().enabled=false;
			var t = (Time.time - startTime) / duration;
			
			for(var item:GameObject in chess)
	        {
	         
	         Instantiate(CHESS_PARTICLE, Vector3(item.transform.position.x,item.transform.position.y,-2), Quaternion.identity);
	         Destroy(item);
	           // item.gameObject.material.color = 
	           
	        }
		}
}