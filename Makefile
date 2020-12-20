ifeq ($(deploy),)
	deploy=1
endif

DOCKER_TAG=ongwaihong/

build_fiml:
	docker build -t fiml --build-arg deploy=1 .
	docker tag fiml\:latest $(DOCKER_TAG)fiml\:latest
	cd nginx; \
	    docker build -t fimlproxy --build-arg BUILD_ENV=deploy .; \
	    docker tag fimlproxy\:latest $(DOCKER_TAG)fimlproxy\:latest;

build_fiml_local:
	docker build -t fiml-local --build-arg deploy=0 .
	cd nginx; docker build -t fimlproxy-local --build-arg BUILD_ENV=local .

run_fiml_local:
	docker run --network host fiml-local\:latest

push_fiml:
	docker push $(DOCKER_TAG)fiml\:latest
	docker push $(DOCKER_TAG)fimlproxy\:latest

get_all:
	docker pull $(DOCKER_TAG)fiml\:latest
	docker pull $(DOCKER_TAG)reclibwh\:latest
	docker pull $(DOCKER_TAG)fimlproxy\:latest

up_local:
	docker-compose -f docker-compose-local.yml up

up:
	docker-compose -f docker-compose.yml up
