//modelo USUARIO

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

    sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {   //valida que hay un solo usuario con ese Email 
                args: true,
                msg: '-> Ya existe un usuario con ese email'
            },
            validate:{      //valida si tiene Email y si es válido
                notEmpty: {
                    msg: "-> Falta email"
                },
                isEmail: {
                    msg: "-> Email no válido"
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return () => this.getDataValue('password')
            }
        },
        salt: {
            type: DataTypes.STRING,
            get() {
                return() => this.getDataValue('salt')
            }
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }, 
        banned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    });
};