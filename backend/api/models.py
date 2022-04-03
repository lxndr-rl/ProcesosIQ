from django.db import models

# Create your models here.


class Persona(models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    telefono = models.CharField(max_length=12)
    email = models.EmailField(null=True, blank=True)
    fNacimiento = models.DateField(null=True, blank=True)

    def __str__(self):
        return '{} {}'.format(self.nombre, self.apellido)


class Timeline(models.Model):
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    descripcion = models.TextField()

    def __str__(self):
        return '{} {}'.format(self.persona, self.fecha)
