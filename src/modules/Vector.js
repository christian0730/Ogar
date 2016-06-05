function Vector(x, y) {
    this.x = 0;
    this.y = 0;
    
    this.set(x, y);
}

module.exports = Vector;

Vector.prototype.clone = function() {
    return new Vector(this);
};

Vector.prototype.set = function(x, y) {
    if (x != undefined) {
        if (x instanceof Vector) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x || 0;
            this.y = y || 0;
        }
    }
};

Vector.prototype.add = function(x, y) {
    if (x instanceof Vector) {
        this.x += x.x;
        this.y += x.y;
    } else {
        this.x += x || 0;
        this.y += y || 0;
    }
    return this;
};

Vector.prototype.sub = function(x, y) {
    if (x instanceof Vector) {
        this.x -= x.x;
        this.y -= x.y;
    } else {
        this.x -= x || 0;
        this.y -= y || 0;
    }
    return this;
};

Vector.prototype.ceil = function() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
};

Vector.prototype.round = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
};

Vector.prototype.floor = function() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
};

Vector.prototype.scale = function(xScale, yScale) {
    this.x *= xScale;
    this.y *= isNaN(yScale) ? xScale : yScale;
    return this;
};

Vector.prototype.distanceTo = function(x, y) {
    return Math.sqrt(this.sqDistanceTo(x, y));
};

Vector.prototype.sqDistanceTo = function(x, y) {
    if (x instanceof Vector) {
        return this.clone().subtract(x).distanceSq();
    } else {
        return this.clone().subtract(x || 0, y || 0).distanceSq();
    }
};

Vector.prototype.angleTo = function(x, y) {
    if (x instanceof Vector) {
        return this.clone().subtract(x).angle();
    } else {
        return this.clone().subtract(x || 0, y || 0).angle();
    }
};

Vector.prototype.turn = function(radians) {
    // Counter-clockwise
    var sin = Math.sin(radians);
    var cos = Math.cos(radians);
    return this.set(this.x * cos - this.y * sin,
                    this.y * sin - this.x * cos);
};

Vector.prototype.turnClockwise = function(radians) {
    // Clockwise
    var sin = Math.sin(radians);
    var cos = Math.cos(radians);
    return this.set(this.x * sin - this.y * cos,
                    this.y * cos - this.x * sin);
};

Vector.prototype.turnTo = function(radians) {
    var len = this.distance();
    this.x = len * Math.sin(radians);
    this.y = len * Math.cos(radians);
};

Vector.prototype.flipX = function() {
    return this.scale(-1, 1);
};

Vector.prototype.flipY = function() {
    return this.scale(1, -1);
};

Vector.prototype.angle = function() {
    return Math.atan2(this.x, this.y);
};

Vector.prototype.distanceSq = function() {
    return this.x * this.x + this.y * this.y;
};

Vector.prototype.distance = function() {
    return Math.sqrt(this.distanceSq());
};

Vector.prototype.negate = function() {
    return this.scale(-1);
};

Vector.prototype.normalize = function() {
    return this.scale(this.distance());
};

Vector.prototype.toString = function() {
    return "{ x: " + this.x + " y: " + this.y + " }";
};
