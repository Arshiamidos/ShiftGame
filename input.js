#pragma strict
var speed =100000.0;
var changecameraspeed=10;
var move=Vector3(0,0,0);
var player_bw='w';
var gravity=-0.98f;
var isgrounded : boolean = false;
var shifting=false;
var shiftingcamera=0.0;
var gravityhitted=false;
var gravityhittedvalue=0.0;
var DIE_PREFAB:GameObject;
var GENERAL_GRAVITY='D';
var animator:Animator;


function Start () 
{
	GENERAL_GRAVITY='D';
	animator = this.GetComponent.<Animator>();
}
function OnTriggerEnter2D (col:Collider2D)
{
		if(col.gameObject.tag=="gravity")
		{
			//Camera.main.transform.rotation=Quaternion.Euler(0,0,col.transform.rotation.eulerAngles.z);
			gravityhittedvalue=col.transform.rotation.eulerAngles.z;
		    gravityhitted=true;
		    
		    						
		    if(player_bw=='w')			
		     switch (Mathf.RoundToInt(col.transform.rotation.eulerAngles.z)){
						 case 0:
							Physics2D.gravity = new Vector2(0f,player_bw=='w'? -9.81f:9.81f);
							GENERAL_GRAVITY='D';
						 break;
						 case 90:
						 	Physics2D.gravity = new Vector2(player_bw=='w'?9.81f:-9.81f,0f);
						 	GENERAL_GRAVITY='R';
						 break;
						 case 180:
						 	Physics2D.gravity = new Vector2(0f,player_bw=='w'?9.81f:-9.81f);
						 	GENERAL_GRAVITY='U';
						 break;
						 case 270:
						 	Physics2D.gravity = new Vector2(player_bw=='w'?-9.81f:9.81f,0f);
						 	GENERAL_GRAVITY='L';
						 break;
						
						 }
			else
				switch (Mathf.RoundToInt(col.transform.rotation.eulerAngles.z)){
						 case 0:
							Physics2D.gravity = new Vector2(0f,player_bw=='w'? -9.81f:9.81f);
							GENERAL_GRAVITY='U';
						 break;
						 case 90:
						 	Physics2D.gravity = new Vector2(player_bw=='w'?9.81f:-9.81f,0f);
						 	GENERAL_GRAVITY='L';
						 break;
						 case 180:
						 	Physics2D.gravity = new Vector2(0f,player_bw=='w'?9.81f:-9.81f);
						 	GENERAL_GRAVITY='D';
						 break;
						 case 270:
						 	Physics2D.gravity = new Vector2(player_bw=='w'?-9.81f:9.81f,0f);
						 	GENERAL_GRAVITY='R';
						 break;
						
						 }
			if(player_bw=='w')				 
				transform.rotation.eulerAngles.z=Mathf.RoundToInt(col.transform.rotation.eulerAngles.z);
			else
				transform.rotation.eulerAngles.z=Mathf.RoundToInt(180+col.transform.rotation.eulerAngles.z);	
		}
		else if(col.gameObject.tag=="die")
		{
			Instantiate(DIE_PREFAB, Vector3(gameObject.transform.position.x,gameObject.transform.position.y,-2), Quaternion.identity);
			
			Debug.Log("Game Over");
		}
		
}
function OnCollisionEnter2D (col:Collision2D)
{
	if(col.gameObject.tag=="ground")
		isgrounded=true;
		
}
function OnCollisionStay2D(col:Collision2D){
	if(col.gameObject.tag=="ground")
		isgrounded=true;
}
function OnCollisionExit2D (col:Collision2D)
{
		if(col.gameObject.tag=="ground")
			isgrounded=false;
		
}
function getinput()
{
	if(Input.GetKeyDown('s'))
	{
					
		if(isgrounded)
		{
		
		
			if(player_bw=='w')
			{
				
				
				if(GENERAL_GRAVITY=='R')
				{
					shiftingcamera=90;
					transform.position.x+=50;
					
				}
				else if(GENERAL_GRAVITY=='D')
				{
					shiftingcamera=0;
					transform.position.y-=50;
				}
				else if(GENERAL_GRAVITY=='L')
				{
					shiftingcamera=-90;
					transform.position.x-=50;
				}
				else if(GENERAL_GRAVITY=='U')
				{
					shiftingcamera=-180;
					transform.position.y+=50;

				}
				
				transform.localScale.y*=-1;
				GetComponent.<Rigidbody2D>().gravityScale*= -1;	
				
				Debug.Log(GENERAL_GRAVITY);
				player_bw='b';
				GetComponent.<SpriteRenderer>().color=Color.black;
				//Camera.main.transform.rotation = Quaternion.Euler(0,0,-180);
				//Camera.main.orthographicSize *= -1;
 
			}
			else
			{
				if(GENERAL_GRAVITY=='R')
				{
					shiftingcamera=90;
					transform.position.x-=50;
					
				}
				else if(GENERAL_GRAVITY=='D')
				{
					shiftingcamera=0;
					transform.position.y+=50;
				}
				else if(GENERAL_GRAVITY=='L')
				{
					shiftingcamera=-90;
					transform.position.x+=50;
				}
				else if(GENERAL_GRAVITY=='U')
				{
					shiftingcamera=-180;
					transform.position.y-=50;

				}
			
			
				transform.localScale.y*=-1;
				player_bw='w';
				GetComponent.<Rigidbody2D>().gravityScale*= -1;
				GetComponent.<SpriteRenderer>().color=Color.white;
				//Camera.main.transform.rotation = Quaternion.Euler(0,0,0);
 				//Camera.main.orthographicSize *= -1;
			}
			
			shifting=true;
		}
	}
	if(Input.GetKey('w'))
	{
		if( GENERAL_GRAVITY=='D')
			transform.position += Vector3(0, player_bw=='w'?2:-2, 0) * speed * Time.deltaTime;
		else if( GENERAL_GRAVITY=='R')
			transform.position += Vector3( player_bw=='w'?-2:2,0, 0) * speed * Time.deltaTime;
		else if( GENERAL_GRAVITY=='U')
			transform.position += Vector3( 0,player_bw=='w'?-2:2, 0) * speed * Time.deltaTime;	
		else if( GENERAL_GRAVITY=='L')
			transform.position += Vector3( player_bw=='w'?2:-2,0, 0) * speed * Time.deltaTime;	
			
			
			
		if(Random.Range(0.0,1.0)>0.5)
			animator.SetInteger("state",2);
		else
			animator.SetInteger("state",3);		
	}
	 if(Input.GetKey('a'))
	{
			if( GENERAL_GRAVITY=='D')
				transform.position += Vector3(player_bw=='w'?-1:1, 0, 0) * speed * Time.deltaTime;
		else if( GENERAL_GRAVITY=='R')
				transform.position += Vector3(0,player_bw=='w'?-1:1, 0) * speed * Time.deltaTime;
		else if( GENERAL_GRAVITY=='U')
				transform.position += Vector3(player_bw=='w'?1:-1,0, 0) * speed * Time.deltaTime;
		else if( GENERAL_GRAVITY=='L')
				transform.position += Vector3(0,player_bw=='w'?1:-1, 0) * speed * Time.deltaTime;
		
		if(transform.localScale.x>0)
			transform.localScale.x*=player_bw=='w'?-1:1;
		else
			transform.localScale.x*= player_bw=='w'?1:-1;
		animator.SetInteger("state",1);
	}
	 if(Input.GetKey('d'))
	{
		if( GENERAL_GRAVITY=='D')
	 		transform.position += Vector3(player_bw=='w'?1:-1, 0, 0) * speed * Time.deltaTime;
	 	else if( GENERAL_GRAVITY=='R')
	 		transform.position += Vector3(0,player_bw=='w'?1:-1, 0) * speed * Time.deltaTime;
	 	else if( GENERAL_GRAVITY=='U')
	 		transform.position += Vector3(player_bw=='w'?-1:1,0, 0) * speed * Time.deltaTime;	
		else if( GENERAL_GRAVITY=='L')
	 		transform.position += Vector3(0,player_bw=='w'?-1:1, 0) * speed * Time.deltaTime;
		
		
		if(transform.localScale.x<0)
			transform.localScale.x*= player_bw=='w'?-1:1;
		else
			transform.localScale.x*= player_bw=='w'?1:-1;
		animator.SetInteger("state",1);
	}
	if (!Input.GetKey('d') && !Input.GetKey('s') && !Input.GetKey('a') && !Input.GetKey('w'))
	{
		animator.SetInteger("state",0);
	}

}
function Update () 
{
	if(gravityhitted)
	{
		Camera.main.transform.rotation=Quaternion.Lerp(Camera.main.transform.rotation, new Quaternion.Euler(0,0,gravityhittedvalue) , 10 * Time.deltaTime);
		if( Mathf.Abs(Mathf.Abs(Camera.main.transform.rotation.eulerAngles.z)-gravityhittedvalue) <=0.2)
			gravityhitted=false;
	}
	if(shifting)
	{
			if(player_bw=='b')
				if( GENERAL_GRAVITY=='D')
					Camera.main.transform.rotation = Quaternion.Lerp(Camera.main.transform.rotation, new Quaternion.Euler(0,0,shiftingcamera+181)  , 10 * Time.deltaTime);
				else if( GENERAL_GRAVITY=='L')
					Camera.main.transform.rotation = Quaternion.Lerp(Camera.main.transform.rotation, new Quaternion.Euler(0,0,shiftingcamera+90)  , 10 * Time.deltaTime);
				else if( GENERAL_GRAVITY=='U')
					Camera.main.transform.rotation = Quaternion.Lerp(Camera.main.transform.rotation, new Quaternion.Euler(0,0,shiftingcamera)  , 10 * Time.deltaTime);
			else if(player_bw=='w')
					Camera.main.transform.rotation = Quaternion.Lerp(Camera.main.transform.rotation, new Quaternion.Euler(0,0,shiftingcamera)  , 10 * Time.deltaTime);
					
			if(player_bw=='b')
			if( Mathf.Abs(Camera.main.transform.rotation.eulerAngles.z)-shiftingcamera+180>=2)
					{
						shifting=false;
						Camera.main.transform.rotation=new Quaternion.Euler(0,0,shiftingcamera+180);
					}
			if(player_bw=='w')
			if( Mathf.Abs(Camera.main.transform.rotation.eulerAngles.z)-shiftingcamera>=2)
					{
						shifting=false;
						Camera.main.transform.rotation=new Quaternion.Euler(0,0,shiftingcamera);
					}
			Debug.Log(GENERAL_GRAVITY+":"+shiftingcamera+":"+Camera.main.transform.rotation.eulerAngles.z)	;			
	}
	else
	{
		getinput();
	}
	



} 