var football, football_img, field, field_img
var touchdown, touchdown_img, touchdownG1, touchdownG2
var fieldgoal, fieldgoal_img, fieldgoalG1, fieldgoalG2
var qb, qb_img, bottomCollider, gameState
var defender, defender_img, defenderG
var score = 0
gameState = "begin"

function preload(){
    football_img = loadImage("football.png")
    touchdown_img = loadImage("touchdown.png")
    fieldgoal_img = loadImage("fieldgoal.png")
    qb_img = loadImage("quarterback.jpg")
    defender_img = loadImage("defender.jfif")
    field_img = loadImage("football field.jpg")
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    field = createSprite(windowWidth/2,-500)
    field.addImage("football field",field_img)
    field.rotation = field.rotation + 90
    field.scale = 5
    qb = createSprite(400,400)
    qb.addImage("quarterback",qb_img)
    qb.scale = 0.5
    bottomCollider = createSprite(windowWidth/2,windowHeight,windowWidth,1)
    bottomCollider.visible = false
    football = createSprite(windowWidth/2,windowHeight-200)
    football.addImage("ball",football_img)
    football.scale = 0.01
    touchdownG1 = new Group()
    fieldgoalG1 = new Group()
    touchdownG2 = new Group()
    fieldgoalG2 = new Group()
    defenderG = new Group()

}

function draw() {
    background("white")
    console.log(gameState)
    if (gameState == "begin") {
        field.visible = false
        football.visible = false
        qb.visible = false
        textSize(30)
        text("Use the arrow keys to aim the football and hit the targets on the left and right",100,(windowHeight/2)-200)
        text("Any targets you miss with the football, you lose those many points",100,(windowHeight/2)-100)
        text("Once the football is on the target click space to throw the football",100,(windowHeight/2))
        text("Move the quarterback with the mouse and avoid the defenders coming from the top",100,(windowHeight/2)+100)
        text("To begin the game, click space",100,(windowHeight/2)+200)
        if (keyWentDown("space")){
            gameState = "start"
        }
    }
    if (gameState == "start") {
        football.visible = true
        qb.visible = true
        points()
        spawn_defender()
        spawn_defender()
        spawn_defender()
        spawn_defender()
        spawn_defender()
        spawn_on()
        gameState = "play"
    }
    if (gameState == "play") {
        field.visible = true
        field.velocityY = 3
        qb.y = windowHeight - 100
        qb.x = mouseX
        console.log(football.y)
        if (field.y >= 1350){
            field.y = -500
        }    
        if ((frameCount-1) % 250 == 0) {
            points()
            spawn_defender()
            spawn_defender()
            spawn_defender()
            spawn_defender()
            spawn_defender()
            spawn_on()

        }
        if (keyDown(RIGHT_ARROW)) {
            football.x = football.x + 3
        }
        if (keyDown(LEFT_ARROW)) {
            football.x = football.x - 3
        }   
        if (keyDown(DOWN_ARROW)) {
            football.y  = football.y + 3
            console.log("bob")
        }    
        if (keyDown(UP_ARROW)) {
            football.y = football.y - 3
        }
        if (qb.isTouching(defenderG)) {
            gameState = "end"
        }
        if (football.isTouching(fieldgoalG1) && keyWentDown("space")) {
            score = score + 3
            fieldgoalG1.destroyEach()
        }
        if (football.isTouching(fieldgoalG2) && keyWentDown("space")) {
            score = score + 3
            fieldgoalG2.destroyEach()
        }    
        if (football.isTouching(touchdownG1) && keyWentDown("space")) {
            score = score + 7
            touchdownG1.destroyEach()
        }
        if (football.isTouching(touchdownG2) && keyWentDown("space")) {
            score = score + 7
            touchdownG2.destroyEach()
        }
        if (touchdownG1.isTouching(bottomCollider)) {
            score = score - 7
            touchdownG1.destroyEach()
        }
        if (touchdownG2.isTouching(bottomCollider)) {
            score = score - 7
            touchdownG2.destroyEach()
        }
        if (fieldgoalG1.isTouching(bottomCollider)) {
            score = score - 3
            fieldgoalG1.destroyEach()
        }
        if (fieldgoalG2.isTouching(bottomCollider)) {
            score = score - 3
            fieldgoalG2.destroyEach()
        }
    }
    if (gameState == "end") {
        textSize(50)
        text("The defender tackled you. Game over.",100,windowHeight/2)
        field.velocityY = 0
        fieldgoalG1.setVelocityYEach(0)
        fieldgoalG2.setVelocityYEach(0)
        touchdownG1.setVelocityYEach(0)
        touchdownG2.setVelocityYEach(0)
        defenderG.destroyEach()
        field.visible = false
        football.visible = false
        qb.visible = false
        fieldgoalG1.destroyEach()
        fieldgoalG2.destroyEach()
        touchdownG1.destroyEach()
        touchdownG2.destroyEach() 
    }
    drawSprites()
    textSize(30)
    text("Score: " + score, windowWidth/2,50)

}
function points() {
    var choose = Math.floor(random(1,5))
    if (choose == 1){
        touchdown = createSprite(400,-50)
        touchdown.addAnimation("7points",touchdown_img)
        touchdown.x = windowWidth - 150
        touchdown.velocityY = 3
        touchdown.scale = 0.75
        touchdownG1.add(touchdown)
    }
    if (choose == 2){
        touchdown = createSprite(400,50)
        touchdown.addAnimation("7points",touchdown_img)
        touchdown.x = 150
        touchdown.velocityY = 3
        touchdown.scale = 0.75
        touchdownG2.add(touchdown)
    }
    if (choose == 3){
        fieldgoal = createSprite(400,0)
        fieldgoal.addAnimation("3points",fieldgoal_img)
        fieldgoal.x = windowWidth - 150
        fieldgoal.velocityY = 3
        fieldgoal.scale = 0.7
        fieldgoalG1.add(fieldgoal)

    }
    if (choose == 4){
        fieldgoal = createSprite(400,0)
        fieldgoal.addAnimation("3points",fieldgoal_img)
        fieldgoal.x = 150
        fieldgoal.velocityY = 3
        fieldgoal.scale = 0.7
        fieldgoalG2.add(fieldgoal)
    }
}
function spawn_defender() {
    defender = createSprite(400,0)
    defender.addAnimation("finisher",defender_img)
    defender.x = random(0, windowWidth)
    defender.velocityY = 12
    defender.scale = 0.1
    defenderG.add(defender)
}
function spawn_on() {
    defender = createSprite(400,0)
    defender.addAnimation("finisher",defender_img)
    defender.x = qb.x
    defender.velocityY = 12
    defender.scale = 0.1
    defenderG.add(defender)
}