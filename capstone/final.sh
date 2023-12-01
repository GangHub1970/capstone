#!/bin/bash

# 원격 서버의 정보
REMOTE_SERVER="221.163.70.206"
REMOTE_USER="developer"
REMOTE_PASSWORD="fkdhsqjemektzja"

# 실행할 스크립트 파일 경로
REMOTE_SCRIPT_PATH="/home/developer/ptj/run.sh"

# 원격 서버의 포트
REMOTE_PORT="14009"

# 원격 서버에 접속하는 함수
connect_to_remote_server() {
    sshpass -p "$REMOTE_PASSWORD" ssh -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_SERVER"
}

# 원격 서버에서 스크립트 실행하는 함수
execute_remote_script() {
    sshpass -p "$REMOTE_PASSWORD" ssh -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_SERVER" "bash $REMOTE_SCRIPT_PATH"
}

# 원격 서버에 접속
connect_to_remote_server

# 원격 서버에서 스크립트 실행
execute_remote_script