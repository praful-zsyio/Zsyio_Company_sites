from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class EstimateView(APIView):
    def post(self, request):
        service_id = request.data.get('serviceId')
        params = request.data.get('params', {})

        if not service_id:
            return Response({"error": "Service ID required"}, status=status.HTTP_400_BAD_REQUEST)

        cost = self.calculate_cost(service_id, params)
        return Response({"estimatedCost": cost})

    def calculate_cost(self, service_id, params):
        # Default values
        pages = int(params.get('pages', 1))
        
        cost = 0

        if service_id == "web-designing":
            iterations = int(params.get('iterations', 1))
            logo = params.get('logo', False)
            cost = 15000 + (pages * 2000) + (max(1, iterations - 1) * 5000) + (6000 if logo else 0)
        
        elif service_id == "web-development":
            features = params.get('features', {})
            cost = 50000 + (pages * 5000) + \
                   (15000 if features.get('cms') else 0) + \
                   (14000 if features.get('auth') else 0) + \
                   (20000 if features.get('payments') else 0)

        elif service_id == "deployment":
            environments = int(params.get('environments', 1))
            cost = 5000 + (environments * 2500)

        elif service_id == "company-details":
            cost = 4000 + (pages * 1500)

        elif service_id == "hosting":
            years = int(params.get('years', 1))
            cost = 5000 * years

        elif service_id == "app-development":
            screens = int(params.get('screens', 5))
            platform = params.get('platform', 'single')
            cost = 50000 + (screens * 4000) + (12000 if platform == 'both' else 0)
        
        elif service_id == "logo-designing":
            concepts = int(params.get('concepts', 1))
            revisions = int(params.get('revisions', 2))
            cost = 6000 + (concepts * 2000) + (max(0, revisions - 2) * 1500)

        elif service_id == "data-solutions":
            dashboards = int(params.get('dashboards', 1))
            integrations = int(params.get('integrations', 0))
            cost = 18000 + (dashboards * 5000) + (integrations * 4000)

        return cost
