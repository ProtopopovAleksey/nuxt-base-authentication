export default function({$auth, redirect, $notifier}) {
  if (!$auth.loggedIn) {
    $notifier.showMessage({content: 'Для просмотра этой страницы необходима авторизация', color: 'error'})
    redirect('/login')
  }
}
