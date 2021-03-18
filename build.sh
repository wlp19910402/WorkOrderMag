docker build -t manage-web:v1 .
docker login --username=wlsnnew@sina.com -p 'wl123@gr' registry.cn-beijing.aliyuncs.com
docker tag manage-web:v1 registry.cn-beijing.aliyuncs.com/wl-images/work-manager-web:1.0
docker push registry.cn-beijing.aliyuncs.com/wl-images/work-manager-web:1.0

docker rmi manage-web:v1
docker rmi registry.cn-beijing.aliyuncs.com/wl-images/work-manager-web:1.0