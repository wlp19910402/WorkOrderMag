docker build -t manage-web:v2 .
docker login --username=wlsnnew@sina.com -p 'wl123@gr' registry.cn-beijing.aliyuncs.com
docker tag manage-web:v2 registry.cn-beijing.aliyuncs.com/wl-images/work-manager-web:2.0
docker push registry.cn-beijing.aliyuncs.com/wl-images/work-manager-web:2.0

docker rmi manage-web:v2
docker rmi registry.cn-beijing.aliyuncs.com/wl-images/work-manager-web:2.0