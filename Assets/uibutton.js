#pragma strict
var menus:GameObject;
var lvels:GameObject;

function level(mn:int)
{
	Application.LoadLevel(mn);

}
function showmenus()
{

	lvels.active=false;
	menus.active=true;
}
function showlevels()
{

	lvels.active=true;
	menus.active=false;
}
function EX()
{

	Application.Quit();
}

