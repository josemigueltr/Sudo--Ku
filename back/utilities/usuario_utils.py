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
    msg_registro=f"Hola!  {datos[1]} \n Gracias por registrarte como {datos[2]} en ebarrotes \n Esta es tu contraseña para que puedas ingresar al sistema {datos[3]}"
    msg_compra=f"Hola!  {datos[1]} \n Gracias por realizar tu compra en ebarrotes \n El monto total fue de:{datos[2]}"
    try:
        msg = Message('Cuenta ebarrotes', sender =   f'{datos[0]}', recipients = [f'{datos[0]}'])
        msg.body = msg_registro if tipo=="registro" else msg_compra
        mail.send(msg)
    except Exception:
        raise
    return "Message sent!"
