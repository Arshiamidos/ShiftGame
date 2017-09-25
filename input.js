#pragma strict
var speed =100000.0;
var changecameraspeed=10;
var move=Vector3(0,0,0);
var player_bw='w';
var gravity=-0.98f;
var isgrounded : boolean = false;
var ingaurd : boolean = false;
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
		    switch (Mathf.RoundToInt(col.transform.rotation.eulerAngles.z)){
						 case 0:
							Physics2D.gravity = new Vector2(0f,player_bw=='w'? -9.81f:9.81f);
							GENERAL_GRAVITY=(player_bw=='w'?'D':'U');
						 break;
						 case 90:
						 	Physics2D.gravity = new Vector2(player_bw=='w'?9.81f:-9.81f,0f);
						 	GENERAL_GRAVITY=(player_bw=='w'?'R':'L');
						 break;
						 case 180:
						 	Physics2D.gravity = new Vector2(0f,player_bw=='w'?9.81f:-9.81f);
						 	GENERAL_GRAVITY=(player_bw=='w'?'U':'D');
						 break;
						 case 270:
						 	Physics2D.gravity = new Vector2(player_bw=='w'?-9.81f:9.81f,0f);
						 	GENERAL_GRAVITY=(player_bw=='w'?'L':'R');
						 break;
						
						 }
				transform.rotation.eulerAngles.z=Mathf.RoundToInt(   (player_bw=='w'?0:180)+	col.transform.rotation.eulerAngles.z);
	
		}
		else if(col.gameObject.tag=="die")
		{
			Instantiate(DIE_PREFAB, Vector3(gameObject.transform.position.x,gameObject.transform.position.y,-2), Quaternion.identity);
			GetComponent.<SpriteRenderer>().enabled=false;
			GetComponent.<BoxCollider2D>().enabled=false;
		}
		
}
function OnCollisionEnter2D (col:Collision2D)
{
	if(col.gameObject.tag=="ground")
		isgrounded=true;
	if(col.gameObject.tag=="gaurd"  )
		ingaurd=true;
		
}
function OnCollisionStay2D(col:Collision2D){
	
	if(col.gameObject.tag=="ground")
		isgrounded=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
	if(col.gameObject.tag=="gaurd" )
		ingaurd=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
}
function OnCollisionExit2D (col:Collision2D)
{
		if(col.gameObject.tag=="ground")
			isgrounded=false;
		if(col.gameObject.tag=="gaurd")
			ingaurd=false;
		
}
function getinput()
{
	if(Input.GetKeyDown('s'))
	{
					
		if(isgrounded && !ingaurd)
		{	
			
				if(GENERAL_GRAVITY=='R')
				{
					shiftingcamera=90;
					transform.position.x+=(player_bw=='w'?50:-50);
					
				}
				else if(GENERAL_GRAVITY=='D')
				{
					shiftingcamera=0;
					transform.position.y+=(player_bw=='w'?-50:50);
				}
				else if(GENERAL_GRAVITY=='L')
				{
					shiftingcamera=270;
					transform.position.x+=(player_bw=='w'?-50:50);
				}
				else if(GENERAL_GRAVITY=='U')
				{
					shiftingcamera=180;
					transform.position.y+=(player_bw=='w'?50:-50);

				}
			
			
				transform.localScale.y*=-1;
				GetComponent.<Rigidbody2D>().gravityScale*= -1;
				GetComponent.<SpriteRenderer>().color=(player_bw=='w'?Color.black:Color.white);
				player_bw=(player_bw=='w'?'b':'w');
				shifting=true;
		}
	}
	if(Input.GetKeyDown('w') && (isgrounded || ingaurd )  )
	{
		//if(isgrounded)
		{
			GetComponent.<Rigidbody2D>().AddForce((player_bw=='w'?2:-2)*transform.up * 30000);		
				
			if(Random.Range(0.0,1.0)>0.5)
				animator.SetInteger("state",2);
			else
				animator.SetInteger("state",3);	
		
		}
			
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
					Camera.main.transform.rotation = Quaternion.Lerp(Camera.main.transform.rotation, new Quaternion.Euler(0,0,shiftingcamera+180)  , 10 * Time.deltaTime);	
			if(player_bw=='w')
					Camera.main.transform.rotation = Quaternion.Lerp(Camera.main.transform.rotation, new Quaternion.Euler(0,0,shiftingcamera)  , 10 * Time.deltaTime);
					
			if(player_bw=='b')
			if( Mathf.Abs( Mathf.Abs(Camera.main.transform.rotation.eulerAngles.z)-Mathf.Abs(   ( shiftingcamera+180)%360 ) ) <=0.2)
					{
						shifting=false;
						Camera.main.transform.rotation=new Quaternion.Euler(0,0,    ( shiftingcamera+180)%360   );
					}
			
				
					
			if(player_bw=='w')
			if( Mathf.Abs(  Mathf.Abs(Camera.main.transform.rotation.eulerAngles.z)-Mathf.Abs(shiftingcamera))<=0.2)
					{
						shifting=false;
						Camera.main.transform.rotation=new Quaternion.Euler(0,0,shiftingcamera);
					}
			
	}
	else
	{
		getinput();
	}




} 