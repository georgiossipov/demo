import base64


def encode_password(password):
    return base64.b64encode(bytes(password, encoding='utf-8')).decode("utf-8")


def decode_password(encoded_password):
    return base64.b64decode(bytes(encoded_password, encoding='utf-8')).decode("utf-8")
