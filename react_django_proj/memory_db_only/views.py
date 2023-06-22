from rest_framework.response import Response
from rest_framework.decorators import api_view
import sqlite3

# Create your views here.


def prev(conn, data):
    if data:
        conn.execute(
            """UPDATE in_memory_table set page_number=?""", (data,))
        conn.commit()
        return list(conn.execute(
            'SELECT page_number from in_memory_table'))[0][0]

    current_page_num = conn.execute(
        'SELECT page_number from in_memory_table')
    new_page_num = list(current_page_num)[0][0] - 1
    conn.execute(
        """UPDATE in_memory_table set page_number=?""", (new_page_num,))
    conn.commit()
    return list(conn.execute(
        'SELECT page_number from in_memory_table'))[0][0]


def next(conn, data):
    current_page_num = conn.execute(
        'SELECT page_number from in_memory_table')
    new_page_num = list(current_page_num)[0][0] + 1
    conn.execute(
        """UPDATE in_memory_table set page_number=?""", (new_page_num,))
    conn.commit()
    return list(conn.execute(
        'SELECT page_number from in_memory_table'))[0][0]


def toggle(conn, data):
    current_toggle = conn.execute(
        'SELECT toggle from in_memory_table')
    new_toggle = 0 if list(current_toggle)[0][0] == 1 else 1
    conn.execute(
        """UPDATE in_memory_table set toggle=?""", (new_toggle,))
    conn.commit()
    return list(conn.execute(
        'SELECT toggle from in_memory_table'))[0][0]


def create_or_edit(conn, data):
    conn.execute(
        """UPDATE in_memory_table set create_or_edit=?""", (data,))
    conn.commit()
    return list(conn.execute(
        'SELECT create_or_edit from in_memory_table'))[0][0]


dict_handlers = {
    'prev': prev,
    'next': next,
    'toggle': toggle,
    'create_or_edit': create_or_edit,
}


@api_view(['GET', 'PUT'])
def inMemoryDb(request, key):  # запросы в память через sqlite.
    # подключаемся к уже созданному соеденению в корневом urls.py - react_django_proj\react_django_proj\urls.py
    conn = sqlite3.connect('file::memory:?cache=shared', uri=True)
    conn.cursor()

    # get запрос (из react_django_proj\react-vite\src\components\StudentsList\StudentsList.jsx строчки 12-17
    # и react_django_proj\react-vite\src\services\requests.js строчки 39-43) для того чтобы после перезагрузки(ctrl+r) приложения,
    # было получено значение последней посещённой страницы таблицы
    if request.method == 'GET':
        data = conn.execute(f'SELECT {key} from in_memory_table')
        return Response(list(data)[0][0])

    # для put запросов, передаём ключ в словарь с функциями обработчиками.
    # ключи передаются в - react_django_proj\react-vite\src\components\Buttons\CreateNewButton\CreateNewButton.jsx - строчка 10,
    # react_django_proj\react-vite\src\components\Buttons\EditRemoveButtons\EditRemoveButtons.jsx - строчка 14, строчки 15-18
    # react_django_proj\react-vite\src\components\Buttons\NextPrevButtons\NextPrevButtons.jsx - строчка 22, 31
    # react_django_proj\react-vite\src\components\Buttons\PageNumberButtons\PageNumberButtons.jsx - строчка 27
    # react_django_proj\react-vite\src\components\CreateEditStudentModal\CreateEditStudentModal.jsx - строчка 14
    data = dict_handlers[key](conn, request.data['putData'])

    # отправляем ответ в react_django_proj\react-vite\src\customHooks\UseMutationInMemory.js, в колбэк onSuccess
    return Response(data)
