import json
from rest_framework.response import Response
from rest_framework.views import APIView
from master.workflow.netconf.workflow_netconf_wdnn import WorkFlowNetConfWdnn as WdnnConf
from common.utils import *


class WorkFlowNetConfWdnn(APIView) :
    """

    """
    def post(self, request, nnid, ver, node):
        """
        - desc : insert data
        """
        try:
            input_data = json.loads(str(request.body, 'utf-8'))
            return_data = WdnnConf(nnid+"_"+ver+"_"+node).set_view_obj( nnid, ver, node, input_data)
            #input_data['model_path'] = get_model_path(nnid, ver, node)
            #nodeid = ''.join([nnid, '_', ver, '_', node])
            #if(WdnnConf().validation_check(input_data)) :
            #else :
            #    return_data = {'message' : 'data validation error'}
            return Response(json.dumps(return_data))
        except Exception as e:
            return_data = {"status": "404", "result": str(e)}
            return Response(json.dumps(return_data))

    def get(self, request, nnid, ver, node):
        """
        - desc : get data
        """
        try:
            return_data = ""
            return Response(json.dumps(return_data))
        except Exception as e:
            return_data = {"status": "404", "result": str(e)}
            return Response(json.dumps(return_data))

    def put(self, request, nnid, ver, node):
        """
        - desc ; update data
        """
        try:
            input_data = json.loads(str(request.body, 'utf-8'))
            input_data['model_path'] = get_model_path(nnid, ver, node)
            nodeid = ''.join([nnid, '_', ver, '_', node])
            if(WdnnConf().validation_check(input_data)) :
                return_data = WdnnConf().set_view_obj(nodeid, input_data)
            else :
                return_data = {'message' : 'data validation error'}
            return Response(json.dumps(return_data))
        except Exception as e:
            return_data = {"status": "404", "result": str(e)}
            return Response(json.dumps(return_data))

    def delete(self, request, nnid, ver, node):
        """
        - desc : delete  data
        """
        try:
            return_data = ""
            return Response(json.dumps(return_data))
        except Exception as e:
            return_data = {"status": "404", "result": str(e)}
            return Response(json.dumps(return_data))
