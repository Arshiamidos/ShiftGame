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

var GAMEOVER=false;
var isfinish=false;
var finishtime=0.0;

var AUDIO_gameover:AudioClip;
var AUDIO_gravity:AudioClip;
var AUDIO_win:AudioClip;
var Audio_source:AudioSource;

var guishiftingtexture:Texture2D;
var guijumpingtexture:Texture2D;
var textmoveright:Texture2D;
var textmoveleft:Texture2D;
var home:Texture2D;

var guijumping=false;
var guishifting=false;


var sensitivity =1.5;
var mobileright=false;
var mobileleft=false;
var aspect=0.0;
function  OnGUI()
{
    GUI.backgroundColor = Color.clear; 
    var _jumping=GUI.RepeatButton( new Rect (Screen.width-aspect, Screen.height-aspect, aspect, aspect) ,guijumpingtexture);
    var _shifting=GUI.RepeatButton( new Rect (Screen.width-aspect, 0, aspect, aspect) ,guishiftingtexture) ;
    var _mobileleft=GUI.RepeatButton( new Rect (0, Screen.height-aspect, aspect, aspect) ,textmoveleft);
    var _mobileright=GUI.RepeatButton( new Rect (aspect+10, Screen.height-aspect, aspect, aspect) ,textmoveright);
    if(GUI.RepeatButton( new Rect (0, 0, aspect/2, aspect/2) ,home))
    {
    	Application.LoadLevel(0);
    }
  
   		
   		
   		
   		
   		
   		
}
      

function Start () 
{
	GENERAL_GRAVITY='D';
	animator = this.GetComponent.<Animator>();
	Physics2D.gravity = new Vector2(0f,player_bw=='w'? -9.81f:9.81f);
	Audio_source=GetComponent.<AudioSource>();
	aspect=Mathf.FloatToHalf(  Screen.width/Screen.height );
	aspect/=100;
	if(Screen.height<600)
		aspect=150;

	
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
				Audio_source.PlayOneShot(AUDIO_gravity,1.0f);
	
		}
		else if(col.gameObject.tag=="die")
		{
			Instantiate(DIE_PREFAB, Vector3(gameObject.transform.position.x,gameObject.transform.position.y,-2), Quaternion.identity);
			GetComponent.<SpriteRenderer>().enabled=false;
			GetComponent.<BoxCollider2D>().enabled=false;
			GAMEOVER=true;
			isfinish=true;
			finishtime=Time.timeSinceLevelLoad;
			Camera.main.GetComponent.<AudioSource>().Stop();
			Audio_source.PlayOneShot(AUDIO_gameover,1.0f);
		}
		else if(col.gameObject.tag=="Finish")
		{
			//Instantiate(DIE_PREFAB, Vector3(gameObject.transform.position.x,gameObject.transform.position.y,-2), Quaternion.identity);
			GetComponent.<SpriteRenderer>().enabled=false;
			GetComponent.<BoxCollider2D>().enabled=false;
			isfinish=true;
			finishtime=Time.timeSinceLevelLoad;
			Camera.main.GetComponent.<AudioSource>().Stop();
			Audio_source.PlayOneShot(AUDIO_win,1.0f);
			//GetComponent.<BoxCollider2D>().enabled=false;
		}
		
}
function OnCollisionEnter2D (col:Collision2D)
{

	OnCollisionStay2D(col);
}
function OnCollisionStay2D(col:Collision2D){
	
	if(col.gameObject.tag=="ground")
	{
		if(player_bw=='w')
		{
			if(GENERAL_GRAVITY=='D' )
			if( gameObject.transform.Find('head').position.y>gameObject.transform.Find('foot').position.y && gameObject.transform.Find('foot').position.y >col.gameObject.transform.position.y && gameObject.transform.Find('head').position.y > col.gameObject.transform.position.y )
					isgrounded=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
				else
					isgrounded=false;
				
			if(GENERAL_GRAVITY=='U' )			
			 if( gameObject.transform.Find('head').position.y< gameObject.transform.Find('foot').position.y && gameObject.transform.Find('foot').position.y< col.gameObject.transform.position.y && gameObject.transform.Find('head').position.y < col.gameObject.transform.position.y )
					isgrounded=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
				else
					isgrounded=false;
					
			if(GENERAL_GRAVITY=='R' )			
			 if( gameObject.transform.Find('head').position.x< gameObject.transform.Find('foot').position.x && gameObject.transform.Find('foot').position.x< col.gameObject.transform.position.x && gameObject.transform.Find('head').position.x < col.gameObject.transform.position.x)
					isgrounded=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
				else
					isgrounded=false;
					
			if(GENERAL_GRAVITY=='L' )		
			 if(gameObject.transform.Find('head').position.x> gameObject.transform.Find('foot').position.x && gameObject.transform.Find('foot').position.x>col.gameObject.transform.position.x && gameObject.transform.Find('head').position.x > col.gameObject.transform.position.x)
					isgrounded=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
				else
					isgrounded=false;
		
		}else
		{
			if(GENERAL_GRAVITY=='D' )
				if( gameObject.transform.Find('head').position.y<gameObject.transform.Find('foot').position.y && gameObject.transform.Find('foot').position.y >col.gameObject.transform.position.y && gameObject.transform.Find('head').position.y > col.gameObject.transform.position.y )
					isgrounded=false;
				else
					isgrounded=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
				
			if(GENERAL_GRAVITY=='U' )				
			 	if( gameObject.transform.Find('head').position.y> gameObject.transform.Find('foot').position.y && gameObject.transform.Find('foot').position.y< col.gameObject.transform.position.y && gameObject.transform.Find('head').position.y < col.gameObject.transform.position.y )
					isgrounded=false;
				else
					isgrounded=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
					
			if(GENERAL_GRAVITY=='R' )			
			 	if( gameObject.transform.Find('head').position.x> gameObject.transform.Find('foot').position.x && gameObject.transform.Find('foot').position.x< col.gameObject.transform.position.x && gameObject.transform.Find('head').position.x < col.gameObject.transform.position.x)
					isgrounded=false;
				else
					isgrounded=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
			
			if(GENERAL_GRAVITY=='L' )		
				if(gameObject.transform.Find('head').position.x< gameObject.transform.Find('foot').position.x && gameObject.transform.Find('foot').position.x>col.gameObject.transform.position.x && gameObject.transform.Find('head').position.x > col.gameObject.transform.position.x)
					isgrounded=false;
				else
					isgrounded=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
		
		}
			
	
	}
	if(col.gameObject.tag=="gaurd" )
	{
			//Debug.Log(gameObject.transform.Find('head').position.y+":"+ gameObject.transform.Find('foot').position.y);
			
		if(player_bw=='w')
		{
		
		if(GENERAL_GRAVITY=='D')
			if( gameObject.transform.Find('head').position.y>gameObject.transform.Find('foot').position.y && gameObject.transform.Find('foot').position.y >col.gameObject.transform.position.y && gameObject.transform.Find('head').position.y > col.gameObject.transform.position.y )
				ingaurd=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
			else
				ingaurd=false;
			
		if(GENERAL_GRAVITY=='U' )			
			if( gameObject.transform.Find('head').position.y< gameObject.transform.Find('foot').position.y && gameObject.transform.Find('foot').position.y< col.gameObject.transform.position.y && gameObject.transform.Find('head').position.y < col.gameObject.transform.position.y )
				ingaurd=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
			else
				ingaurd=false;
				
		if(GENERAL_GRAVITY=='R')			
			if( gameObject.transform.Find('head').position.x< gameObject.transform.Find('foot').position.x && gameObject.transform.Find('foot').position.x< col.gameObject.transform.position.x && gameObject.transform.Find('head').position.x < col.gameObject.transform.position.x)
				ingaurd=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
			else
				ingaurd=false;
		if(GENERAL_GRAVITY=='L')		
			if(gameObject.transform.Find('head').position.x> gameObject.transform.Find('foot').position.x && gameObject.transform.Find('foot').position.x>col.gameObject.transform.position.x && gameObject.transform.Find('head').position.x > col.gameObject.transform.position.x)
				ingaurd=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
			else
				ingaurd=false;
		}
		else
		{
			if(GENERAL_GRAVITY=='D')
				if( gameObject.transform.Find('head').position.y<gameObject.transform.Find('foot').position.y && gameObject.transform.Find('foot').position.y >col.gameObject.transform.position.y && gameObject.transform.Find('head').position.y > col.gameObject.transform.position.y )
					ingaurd=false;
				else
					ingaurd=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
				
			if(GENERAL_GRAVITY=='U') 			
				if( gameObject.transform.Find('head').position.y> gameObject.transform.Find('foot').position.y && gameObject.transform.Find('foot').position.y< col.gameObject.transform.position.y && gameObject.transform.Find('head').position.y < col.gameObject.transform.position.y )
					ingaurd=false;
				else
					ingaurd=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
					
			if(GENERAL_GRAVITY=='R')			
				if( gameObject.transform.Find('head').position.x> gameObject.transform.Find('foot').position.x && gameObject.transform.Find('foot').position.x< col.gameObject.transform.position.x && gameObject.transform.Find('head').position.x < col.gameObject.transform.position.x)
					ingaurd=false;
				else
					ingaurd=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
			if(GENERAL_GRAVITY=='L')		
				if(gameObject.transform.Find('head').position.x< gameObject.transform.Find('foot').position.x && gameObject.transform.Find('foot').position.x>col.gameObject.transform.position.x && gameObject.transform.Find('head').position.x > col.gameObject.transform.position.x)
					ingaurd=false;
				else
					ingaurd=!(Mathf.RoundToInt(Vector3.Angle(col.gameObject.transform.right,gameObject.transform.right))==90);
		
		}
		
	}
		
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
 	if(Input.touches.Length==0)
   {
   		guijumping=guishifting=mobileright=mobileleft=false;
   }
   
    var touchedfuckingjump=false;
    var touchedfuckingleft=false;
    var touchedfuckingright=false;
    for( var t:Touch in Input.touches)
    {
    	//if(t.phase==TouchPhase.Stationary  || t.phase==TouchPhase.Moved)
    	{
    	
    		if(Rect(Screen.width-aspect, Screen.height-aspect, aspect, aspect).Contains(t.position))
    		{
	          	guishifting=true;
	        }
	   		else
	   		{
	   			//guishifting=false;
	   		}
	    	if(Rect (Screen.width-aspect, 0, aspect, aspect).Contains(t.position)  )
	    	 {
	          		touchedfuckingjump=true;

	        }
	   		
	   		
	   		if(Rect (0, 0, aspect, aspect).Contains(t.position))	
	   		 {
	          touchedfuckingleft=true;
	        }
	   		
	   				
	   		if(Rect ( aspect+10,0, aspect, aspect).Contains(t.position))	
	        {
	        	touchedfuckingright=true;
	        }
	   		
   		
   		}
   		
   												
   							
    }       	
   		
     			guijumping=touchedfuckingjump;  
	          	mobileright=touchedfuckingright;
	          	mobileleft=touchedfuckingleft;
    
   		
   		






	if(Input.GetKeyDown('s') || guishifting)
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
				//GetComponent.<BoxCollider2D>().enabled=false;
		}
	}
	if( (Input.GetKey('w') || guijumping) && (isgrounded || ingaurd )  )
	{
			GetComponent.<Rigidbody2D>().AddForce((player_bw=='w'?2:-2)*transform.up * 17000);		
			
			if(Random.Range(0.0,1.0)>0.5)
				animator.Play("jump1");
			else
				animator.Play("jump2");	

			
	}
	 if(Input.GetKey('a') || mobileleft)
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
			
			
		if(Mathf.Abs(GetComponent.<Rigidbody2D>().velocity.y )<0.5)	
			animator.Play("run");
		else
			animator.Play("jump2");

	}
	 if(Input.GetKey('d') || mobileright)
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
			
		if(Mathf.Abs(GetComponent.<Rigidbody2D>().velocity.y )<0.5)
			animator.Play("run");
		else
			animator.Play("jump2");
	}
	if (!Input.GetKey('d') && !Input.GetKey('s') && !Input.GetKey('a') && !Input.GetKey('w') && !mobileleft && !mobileright )
	{
		if(Mathf.Abs(GetComponent.<Rigidbody2D>().velocity.y )<0.5)	
			animator.Play("idle");
		else 
			animator.Play("jump2");
	}
	

}
function FixedUpdate () 
{





	if(isfinish)
	{
		
		if(GAMEOVER)
		{
			if(Time.timeSinceLevelLoad- finishtime > 3)
				Application.LoadLevel(Application.loadedLevel);
		
		}
		else if(Time.timeSinceLevelLoad- finishtime > 3)
		{
			if(Application.loadedLevelName=="last")
				Application.LoadLevel(0);
			Application.LoadLevel(Application.loadedLevel+1);
		}
	
	
	}
	if(gravityhitted && !shifting)
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
						guishifting=shifting=false;
						
						//GetComponent.<BoxCollider2D>().enabled=true;
						Camera.main.transform.rotation=new Quaternion.Euler(0,0,    ( shiftingcamera+180)%360   );
					}
			
				
					
			if(player_bw=='w')
			if( Mathf.Abs(  Mathf.Abs(Camera.main.transform.rotation.eulerAngles.z)-Mathf.Abs(shiftingcamera))<=0.2)
					{
						guishifting=shifting=false;
						//GetComponent.<BoxCollider2D>().enabled=true;
						Camera.main.transform.rotation=new Quaternion.Euler(0,0,shiftingcamera);
					}
			
	}
	else
	{
		getinput();
	}




} 