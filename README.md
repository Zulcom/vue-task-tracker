# UI Task Tracker (Vue)
 Трекер задач. Работает на Vue 2.6.10. Сделана на основе проекта Vue storefront. 
 Учётные записи для теста:
  ```
  username:password
  user:passwd
  ```
## Роутинг
 Используется `vue-router` для роутинга. Без авторизации никуда не пускает. Настройки мета-информации страниц хранятся в конфиге роутера, компоненты в роутере подгружаются асинхронно
## Клиентское локальное хранилище
 Для удобной работы с хранилищем используется прослойка UniversalStorage над библиотекой local**F**orage. Умеет хранить одинаковые данные как в IndexedDB, так и в localstorage. Настройки мест хранения меняюься в конфиге, но лучше с ними не эксперементировать. Благодаря прослойке UniversalStorage, которую я практически полностью позаимствовал из Vue storefront, хранилиша не переполняются и в них добавляется возможность делать итерацию по всем элементам.
## Общие концепции
### Конфигурация
 Конфигурация всегда ожидается из файла `config\default.json`.
 ### CSS
 Стили общие для всего приложения,они представляют из себя подход Atomic CSS (много классов с мелким функционалом, а-ля `.flex.middle-xs.brdr-1`). Все цвета в файле __colors вписаны по своим именам в общий SASS массив, из него потом генерируются классы `.cl-имяцвета`. Настоятельно не рекомендуюется без крайней нужды вводить цвета в компонентах через прибивание гвозядми.
 ### Фильтры
 Это подход трансформации данных в Vue компонентах, например UNIX Timestamp в "1 дек 3099 10:12". Общие фильтры в папке `filters`, когда есть нужда в них не надо заново писать тот же функционал, сразу нужно ознакомься с содержанием этой папки. 
 ## Layouts
 Концепт Layouts – подход глобальной раскладки компонентов (шапка, боди, футер). Если стандартная и единственная тема не нравится - можно дублировать `layouts\default` и меняй шапку с подвал местами, например. А ещё там подключаются все модалки, мета, глобальные стили и анимация полосы загрузки сверху.
 ## Lib
 Этот код - заимстованные библиотеки, адаптированные под реалии этого проекта. Представляется как библиотека, потому что к непосредственной реализации кода имеет слабое оношение.
 ## Modules
 Считается, что в этой модульной архитектуре разные функции могут жить отдельно, поэтому вся логика работы с данными разбита по сущносям в разыне модули и описана в этой папке. Отсюда модули подгружаются кастомным лоаудером, который описан в main и умеет запускать хуки before/after регистрации модуля. Например, запустить action восстановления сессии пользователя из localstorage при подключении модуля пользователя. 
 ## Plugins
 Это тот же libs, только специфичный для платформы Vue. В этом случае там хранится лишь одна библиотека, которая позволяет усрость во Vue паттерн Publisher->Subscriber (посредствам этого паттерна ослабляется связь между методами и компонентами системы)
 ## Имитация API
 API находится в `scripts\resolvers\api.js`, однако там только подгрузка данных из JSON. Для полноценной работы нужно добавить серверную часть и обработку ошибок запросов.
## Сборка и работа с CLI

Установка зависимости
```
npm install
```
Запуск локального сервер с HMR:
```
npm run serve
```
Проверка стиля кода:
```
npm run lint
```

### Деплой
```
npm run build
```
