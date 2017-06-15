const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wwwb', {
    logging: false
});

const Stroke = db.define('stroke', {
    startX: Sequelize.INTEGER,
    startY: Sequelize.INTEGER,
    endX: Sequelize.INTEGER,
    endY: Sequelize.INTEGER,
    strokeColor: {
        type: Sequelize.STRING,
        defaultValue: 'black'
    }
}, {
    getterMethods: {
        start: function() {
            return {
                x: this.startX,
                y: this.startY
            };
        },
        end: function() {
            return {
                x: this.endX,
                y: this.endY
            }
        }
    }
});

module.exports = {
    db,
    Stroke
};