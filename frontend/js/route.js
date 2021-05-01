var s=0;
var scount=0;
var sid=[];
var xdir=[-1,0,1,0];
var ydir=[0,1,0,-1];
var dxdir=[0,1,0,-1];
var dydir=[-1,0,1,0];
var truePath="";
var pathtaken=[];
var vis = new Array(21);
var isMousedown = false;

for(var i=0;i<vis.length;i++)
{
  vis[i]= new Array(70);
}
for(var i=0;i<21;i++)
{
    for(var j=0;j<70;j++)
    {
      vis[i][j]=false;
    }
}



function maketab(){
	var body = document.getElementsByTagName("div")[1];
	var tbl = document.createElement("table");
	var tblBody = document.createElement("tbody");
	for (var i = 0; i <21; i++)
	{
			var row = document.createElement("tr");
			for (var j = 0; j < 70; j++) 
			{
				var cell = document.createElement("td");
				cell.classList.add("box");
				cell.setAttribute('id',i+"/"+j);
				cell.addEventListener("click",fillcell);
				cell.addEventListener("mousedown",addwall);
				cell.addEventListener("mouseover",keepwall);
				cell.addEventListener("mouseup",stopwall);
				row.appendChild(cell);
			}
			tblBody.appendChild(row);
	}
	tbl.appendChild(tblBody);
	body.appendChild(tbl);
}


function addwall(){
	if(s==2){
	var ck=this.getAttribute('class');
	if(ck!="start" || ck!="end"){
		var idid=this.getAttribute('id').split('/');
		console.log(idid);
		vis[parseInt(idid[0])][parseInt(idid[1])]=true;
		isMousedown=true;
		this.setAttribute('class',"wall");
	}
}
}

function keepwall(){
	if(s==2){
	if(isMousedown)
	{
		var ck=this.getAttribute('class');
		if(ck!="start" || ck!="end"){
			
			var idid=this.getAttribute('id').split('/');
			console.log(idid);
			vis[parseInt(idid[0])][parseInt(idid[1])]=true;
			this.setAttribute('class',"wall");
		}
	}
	}	
}

function stopwall(){
	if(s==2){
	var ck=this.getAttribute('class');
	if(ck!="start" || ck!="end"){
		var idid=this.getAttribute('id').split('/');
		vis[parseInt(idid[0])][parseInt(idid[1])]=true;
		this.setAttribute('class',"wall");
		isMousedown=false;
	}
}
}


function setvisF(){
	console.log("im in ");
	for(let i=0;i<21;i++)
	{
		for(let j=0;j<70;j++)
		{
			let curg=document.getElementById(i+'/'+j);
			let ck=curg.getAttribute('class');
			if(ck=="wall")
			{
				continue;
			}
			else{
				vis[i][j]=false;
				curg.setAttribute('class',"box");
			}
		}
	}
}


function inside(ti,tj){
    if(ti>=0 && ti<21 && tj>=0 && tj<70)
      return true;
    return false;
}



function startbfs(){
	console.log(vis);
	setvisF();
	if((s==1||s==2) && scount==2)
	{
		var q = new Array();
		var curpath = String(sid[0]);
		var cnode={
			"id" : sid[0],
			"path":curpath
		}
		q.push(cnode);
		var sindx=sid[0].split('/');
		var x=parseInt(sindx[0]);
		var y=parseInt(sindx[1]);
		vis[x][y]=true;
		var cnt=1;
		var visitedIdx=[];
		visitedIdx.push(sid[0]);
		console.log(vis[x][y]);
		while(q.length!=0)
		{
			var tnode=q[0];
			var temp=tnode.id.split("/");
			let d=0;
			q.shift();
			var qx=parseInt(temp[0]);
			var qy=parseInt(temp[1]);
			
			for(var i=0;i<4;i++)
			{
				var ti=qx+xdir[i];
				var tj=qy+ydir[i];
				
				if(inside(ti,tj) && vis[ti][tj]==false)
				{
					console.log(vis[ti][tj]);
					vis[ti][tj]=true;
					var currentId=ti+"/"+tj;
					var changecell=document.getElementById(currentId);
					visitedIdx.push(currentId);
					var nextPath=tnode.path+"."+currentId;
					var nnode={
						"id":currentId,
						"path" : nextPath
					}
					if(currentId==sid[1])
					{
						d=1;
						pathtaken=nnode.path;
						break;
					}
					cnt++;
					q.push(nnode);
				}
			}
			if(d==1)
			break;
		}
		//var result=0;
		//console.log(result);
		changeVis(visitedIdx,pathtaken);
	}
}


function changeVis(visitedIdx,pathtaken)
{
	console.log(visitedIdx);
	var d=0;
	for(let i=1;i<visitedIdx.length;i++)
	{
			setTimeout(function(){
				//console.log(i);
				let one=visitedIdx[i];
				console.log(one)
				if(one==sid[1])
				{
					d=1;
					console.log("mark em darn it");
					markshortestpath(pathtaken);
				}
				var two=document.getElementById(one);
				two.setAttribute('class','visited');
			},25*i)
			if(d==1)
			break;
	}
	
}

function clearall(){
	
	s=0;
 	scount=0;
 	sid=[];
	pathtaken=[];
	for(let i=0;i<21;i++)
	{
		for(let j=0;j<70;j++)
		{
			let curg=document.getElementById(i+'/'+j);
			curg.setAttribute('class',"box");
			curg.style.removeProperty('background-color');
		}
	}
}


function markshortestpath(pathtaken)
{
	
	var arr=pathtaken.split(".");
	for(let i=0;i<arr.length;i++)
	{
		setTimeout(function(){
			let one=arr[i];
			var two=document.getElementById(one);
			two.setAttribute("class",'shortestpath');
		},i*100);
	}
}

function fillcell(){
   if(s==1 && scount<2)
   {
      scount+=1;
      var tid=this.getAttribute('id');
      sid.push(tid);
      console.log(tid);
	  if(scount==1)
	  {
		  this.setAttribute('class',"start");
		  this.setAttribute('style',"background-color: green;");
	  }
	  else{
		this.setAttribute('class',"end");
      	this.setAttribute('style',"background-color: red;");
	  }
   }
}


function set(){
   setvisF();
   s=1;
   scount=0;
   console.log(s);
   if(sid.length!=0)
   {
		for(var i=0;i<sid.length;i++)
		{
			var temp=document.getElementById(sid[i]);
			temp.style.backgroundColor = "";
		}
   }
   sid=[];
}


function startdfs()
{
	setvisF();
	if(s==1||s==2 && scount==2)
	{
		let st = new Array();
		let d=0;
		st.push(sid[0]);
		var stid=sid[0].split('/');
		let x=parseInt(stid[0]);
		let y = parseInt(stid[1]);
		var visitedIdx=[];
		visitedIdx.push(sid[0]);
		while(st.length!=0)
		{
			let temp = st[st.length-1].split('/');
			console.log(st[st.length-1]);
			st.pop();
			if(!inside(temp[0],temp[1]) || vis[temp[0]][temp[1]]==true)
			{
				continue;
			}
			vis[temp[0]][temp[1]]=true;
			visitedIdx.push((temp[0]+'/'+temp[1]));
			if((temp[0]+'/'+temp[1])==sid[1])
			{
				console.log("where tf am i");
				break;
			}
			var qx=parseInt(temp[0]);
			var qy=parseInt(temp[1]);
			//console.log(qx,qy);
			if((qx+'/'+qy=="20/68"))
			{
				console.log("go up  first not left ");
			}
			for(let i=0;i<4;i++)
			{
				var ti=qx+dxdir[i];
				var tj=qy+dydir[i];
				var currentId=ti+"/"+tj;
				st.push(currentId);
			}
		}
	}
}


function addwalls(){
	s=2;
}
maketab();
