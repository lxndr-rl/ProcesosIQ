import json
from telnetlib import STATUS
from urllib import response
from django.http import JsonResponse
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .models import Persona


class PersonasView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id == 0):
            Personas = list(Persona.objects.values())
            if(len(Personas) > 0):
                response = JsonResponse(
                    {'status': 'ok', 'data': Personas}, status=200)
            else:
                response = JsonResponse(
                    {'status': 'error', 'message': 'No se encontraron personas registradas'}, status=404)
        else:
            Personas = list(Persona.objects.filter(id=id).values())
            if(len(Personas) > 0):
                response = JsonResponse({'status': 'ok', 'data': Personas}, status=200)
            else:
                response=JsonResponse(
                    {'status': 'error', 'message': 'No se encontró la persona'}, status = 404)
        return response

    def post(self, request):
        try:
            body=json.loads(request.body)
        except:
            body={}
        if(not body):
            response=JsonResponse(
                {'status': 'error', 'message': 'No se ingresó datos de la persona'}, status = 400)
        else:
            fNacimiento=body.get('fNacimiento') if body.get(
                'fNacimiento') else None
            email=body.get('email') if body.get('email') else None
            telefono=body.get('telefono', '') if body.get('telefono') else ''
            apellido=body.get('apellido', '') if body.get('apellido') else ''
            nombre=body.get('nombre', '') if body.get('nombre') else ''
            if(not nombre or not apellido or not telefono):
                response=JsonResponse(
                    {'status': 'error', 'message': 'No se ingresó nombre, apellido o teléfono'}, status = 400)
            else:
                Persona.objects.create(
                    nombre = nombre,
                    apellido = apellido,
                    telefono = telefono,
                    email = email,
                    fNacimiento = fNacimiento
                )
                response=JsonResponse(
                    {'status': 'ok', 'message': 'Persona creada correctamente'}, status = 201)
        return response

    def put(self, request, id = 0):
        if(id > 0):
            try:
                body=json.loads(request.body)
            except:
                body={}
            if(not body):
                response=JsonResponse(
                    {'status': 'error', 'message': 'No se ingresó datos a actualizar'}, status = 400)
            else:
                Personas=list(Persona.objects.filter(id=id).values())
                if(len(Personas) > 0):
                    Personas=Persona.objects.get(id = id)
                    fNacimiento=body.get('fNacimiento') if body.get(
                        'fNacimiento') else Personas.fNacimiento
                    email=body.get('email') if body.get(
                        'email') else Personas.email
                    telefono=body.get('telefono', '') if body.get(
                        'telefono') else Personas.telefono
                    apellido=body.get('apellido', '') if body.get(
                        'apellido') else Personas.apellido
                    nombre=body.get('nombre', '') if body.get(
                        'nombre') else Personas.nombre

                    Personas.nombre=nombre
                    Personas.apellido=apellido
                    Personas.telefono=telefono
                    Personas.email=email
                    Personas.fNacimiento=fNacimiento
                    Personas.save()
                    response=JsonResponse(
                        {'status': 'ok', 'message': f'{id}:{nombre} actualizado correctamente'}, status = 200)
                else:
                    response=JsonResponse(
                        {'status': 'error', 'message': 'No se encontró la persona'}, status = 404)
        else:
            response=JsonResponse(
                {'status': 'error', 'message': 'No se ingresó id de la persona'}, status = 400)
        return response

    def delete(self, request, id = 0):
        if(id > 0):
            Personas=list(Persona.objects.filter(id=id).values())
            if(len(Personas) > 0):
                Persona.objects.get(id = id).delete()
                response=JsonResponse(
                    {'status': 'ok', 'message': f'{id} eliminado correctamente'}, status = 200)
            else:
                response=JsonResponse(
                    {'status': 'error', 'message': 'No se encontró la persona'}, status = 404)
        else:
            response=JsonResponse(
                {'status': 'error', 'message': 'No se ingresó id de la persona'}, status = 400)
        return response
