<link href="{{ asset('css/menu-style.css') }}" rel="stylesheet">

<div  class="f-multi-level-dropdown f-bg-col-blu f-fon-18px f-fon-fam-open ">
  <ul>
    <li>
      <a  href="{{ route('NetworkC.edit') }}">Home
      </a>
    </li>
    <li>
      <div class="toggle">
        <a href="#">
          Tools
        </a>
        <ul>
          <li>
            <a  href=" {{ $allURLs['sub_report_read'] }}">Viewer
            </a>
          </li>
          <li>
            <a  href="{{ $allURLs['sub_report_edit'] }}">Editor
            </a>
          </li>

        </ul>
      </div>
    </li>

    <li>
      <a  href="{{ route('NetworkC.help') }}">Help
      </a>
    </li>
  </ul>
</div>
