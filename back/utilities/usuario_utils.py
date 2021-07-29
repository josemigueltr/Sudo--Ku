import secrets
import string
from flask_mail import  Message, Mail
from flask import current_app as app


def generar_contrasenia():
    alphabet = string.ascii_letters + string.digits
    password = ''.join(secrets.choice(alphabet) for i in range(8)) 
    return password


def envia_mail(datos,tipo):
    mail = Mail(app)
    mensaje=""
    if tipo=="registro":
        mensaje=f"Hola!  {datos[1]} \n Gracias por registrarte como {datos[2]} en ebarrotes \n Esta es tu contraseña para que puedas ingresar al sistema {datos[3]}"
    else:
        mensaje=f"Hola!  {datos[1]} \n Gracias por realizar tu compra en ebarrotes \n El total de tu compra fue de {datos[2]} "
    try:
        msg = Message('Cuenta ebarrotes', sender =   f'{datos[0]}', recipients = [f'{datos[0]}'])
        msg.body = mensaje
        mail.send(msg)
    except Exception:
        raise
    return "Message sent!"
