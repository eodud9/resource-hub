# ResourceHub Learning Log

### BaseEntity 설계

공통적으로 사용되는 엔터티 속성(생성/수정 시간)을 BaseEntity 분리

- `@MappedSuperclass`
  - BaseEntity 자체를 테이블로 만들지 않음
  - 이를 상속받는 Entity가 필드로 사용할 수 있게 함

- `@CreatedTime`
  - Entity 생성 시 'createdAt'을 자동 기록

- `@ModifiedTime`
  - Entity 수정 시 'modifiedAt'을 자동 기록

- `@EnableJpaAuditing`
  - JPA Auditing 기능 활성화

### Lombok
- Java에서 반복적인 코드을 쉽게 처리 ex) @Getter

## 2026-09-01

### 멤버 변수 생성 시 Wrapper 사용하는 이유

### Class::new

### NoArgConstructor 필요한 이유

### @Transactional

### ResponseEntity에서 build()가 붙는 기준?

### validation 검사 시 @Column, @NotBlank 등 DB 차원 API 차원에서 사용되는 유효성 검자 어노테이션이 다르다.

### spring을 통해 의존성 주입이 이루어지는 과정과 주입이 가능한 이유, 원리

### @GeneratedValue(strategy = GenerationType.IDENTITY) 의미

### 자주 사용되는 어노테이션들 정리

### erd, 전체 구조 정리

### NoArgConstructor, AllArgConstructor 사용 구분

## ManyToOne, OneToMany 사용 구분

### Spring, Spring Boot에서 주로 사용되는 어노테이션 정리 (@Bean, @Configuration 등)