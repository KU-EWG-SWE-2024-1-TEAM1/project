# Movie Movit 프로젝트 포트폴리오

## 배포 주소
- https://www.moviemovit.xyz

## Notion 주소
- https://www.notion.so/Movie-Movit-668de31827134654a1f970218a0fd651

## 작업 기간
- 2024.06.10 - 2024.06.27

## 인력 구성
- 백엔드 개발자 1명

## 프로젝트 목적
- 영화 리뷰 및 커뮤니티 사이트 개발
- 유저들이 영화 이벤트에 대한 리뷰를 작성하고, 별점으로 평가할 수 있는 플랫폼 제공

## 주요 업무 및 상세 역할
- **JWT 인증 및 인가 구현**
  - JWT 토큰 생성, 검증, 갱신 로직 작성
  - Role-based Access Control (RBAC) 구현
- **댓글 및 게시물 관리**
  - CRUD 기능 구현
  - 댓글 작성 시 포스트 점수 자동 업데이트
- **파일 업로드**
  - AWS S3를 이용한 이미지 업로드 기능 구현
  - CloudFront를 이용한 CDN 운영으로 비용 감소
- **데이터베이스 관리**
  - TypeORM을 이용한 데이터베이스 스키마 관리 및 마이그레이션
  - 초기 데이터베이스 스키마 설정 및 관리
- **API 설계 및 구현**
  - 영화, 포스트, 댓글 등 다양한 엔티티에 대한 RESTful API 구현
  - 페이지네이션을 이용한 page, totalpage, limit, sortField, orderby 정렬 기능 구현
- **테스트**
  - Jest를 이용한 단위 테스트 작성
  - 주요 서비스 로직에 대한 Postman 테스트 케이스 작성 및 검증

## 사용 언어 및 개발환경
- **언어:** JavaScript, TypeScript
- **프레임워크:** NestJS, TypeORM, NextJS, React, Tailwind CSS
- **데이터베이스:** MySQL
- **호스팅:** AWS EC2, RDS, CloudFront
- **기타:** AWS S3, JWT, Jest, Route53, NameCheap

## 느낀 점
- 인증 및 인가 방식에 대한 이해를 높일 수 있었고, 서비스에 적용해보며 경험을 쌓을 수 있었음
- Nest를 사용하여 새로운 기술에 대한 도전 경험
- TypeORM을 이용한 데이터베이스 관리의 편리함과 효율성을 체감
- AWS 인프라를 활용한 서비스 배포 및 관리의 난이도 및 중요성을 실감
- DB, 네트워크 기본지식의 중요성을 실감

## 참고자료
- [NestJS 공식 문서](https://docs.nestjs.com/)
- [TypeORM 공식 문서](https://typeorm.io/)
- [AWS S3 공식 문서](https://docs.aws.amazon.com/s3/)
- [Jest 공식 문서](https://jestjs.io/docs/en/getting-started)
